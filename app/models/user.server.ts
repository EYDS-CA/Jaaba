import arc from '@architect/functions';
import bcrypt from 'bcryptjs';
import invariant from 'tiny-invariant';

export type ApplicationData = {
  applicationKey: string;
  openingId: string;
};

export type User = {
  id: `email#${string}`;
  email: string;
  profile?: {
    name: string;
    letter: string;
  };
  applicationData: ApplicationData[];
};
export type Password = { password: string };

export async function getUserById(id: User['id']): Promise<User | null> {
  const db = await arc.tables();
  const result = await db.user.query({
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': id },
  });

  const [record] = result.Items;
  if (record) {
    return {
      id: record.pk,
      email: record.email,
      profile: record.profile,
      applicationData: record.applicationData,
    };
  }
  return null;
}

export async function getUserByEmail(email: User['email']) {
  return getUserById(`email#${email}`);
}

async function getUserPasswordByEmail(email: User['email']) {
  const db = await arc.tables();
  const result = await db.password.query({
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: { ':pk': `email#${email}` },
  });

  const [record] = result.Items;

  if (record) return { hash: record.password };
  return null;
}

export async function saveUserProfile({
  profile,
  email,
}: {
  profile: User['profile'];
  email: string;
}) {
  const db = await arc.tables();

  const saved = await db.user.update({
    Key: { pk: `email#${email}` },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #P = :p',
    ExpressionAttributeNames: {
      '#P': 'profile',
    },
    ExpressionAttributeValues: {
      ':p': profile,
    },
  });
  return saved;
}

export async function addApplicationToProfile(
  email: string,
  applicationData: ApplicationData,
): Promise<User> {
  const db = await arc.tables();

  const saved = await db.user.update({
    Key: { pk: `email#${email}` },
    ReturnValues: 'ALL_NEW',
    UpdateExpression:
      'SET #AI = list_append(if_not_exists(#AI, :empty_list), :vals)',
    ExpressionAttributeNames: {
      '#AI': 'applicationData',
    },
    ExpressionAttributeValues: {
      ':empty_list': [],
      ':vals': [applicationData],
    },
  });
  return saved;
}

export async function createUser(
  email: User['email'],
  password: Password['password'],
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const db = await arc.tables();
  await db.password.put({
    pk: `email#${email}`,
    password: hashedPassword,
  });

  await db.user.put({
    pk: `email#${email}`,
    email,
  });

  const user = await getUserByEmail(email);
  invariant(user, `User not found after being created. This should not happen`);

  return user;
}

export async function deleteUser(email: User['email']) {
  const db = await arc.tables();
  await db.password.delete({ pk: `email#${email}` });
  await db.user.delete({ pk: `email#${email}` });
}

export async function verifyLogin(
  email: User['email'],
  password: Password['password'],
) {
  const userPassword = await getUserPasswordByEmail(email);

  if (!userPassword) {
    return undefined;
  }

  const isValid = await bcrypt.compare(password, userPassword.hash);
  if (!isValid) {
    return undefined;
  }

  return getUserByEmail(email);
}
