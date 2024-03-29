module.exports = {

    development: {
      client: 'sqlite3',
      connection: {
        filename: './src/database/db.sqlite'
      },
      migrations:{
        directory: './src/database/migrations'
      },
      useNullAsDefault:true,
    },

    production:{
      client: 'sqlite3',
      connection:{
        filename: './src/database/dbprod.sqlite'
      },
      migrations:{
        directory: './src/database/migrations'
      }
    }}