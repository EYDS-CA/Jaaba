@app
jaaba

@http
/*
  method any
  src server

@static

@aws
profile default
region ca-central-1

@tables
user
  pk *String

password
  pk *String # userId

note
  pk *String  # userId
  sk **String # noteId
