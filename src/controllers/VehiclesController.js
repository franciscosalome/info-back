const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { id } = request.params
    const { limit = 20, page = 1 } = request.query
    const [count] = await connection('vehicle').count();
    if(id){  
      var vehicles = await connection('vehicle')
        .select('*')
        .where('id', '=', id)
        .limit(limit)
        .offset(limit * (page - 1));
    }else{
      const {searchKey, searchValue, searchMode } = request.query; //searchMode can be exactly or partial]
      if(searchKey && searchValue){
        if(searchMode == 'partial'){
          var vehicles = await connection('vehicle')
            .select('*')
            .where(searchKey, 'like', `%${searchValue}%`)
            .limit(limit)
            .offset(limit * (page - 1));
        }else{
          var vehicles = await connection('vehicle')
            .select('*')
            .where(searchKey, '=', searchValue)
            .limit(limit)
            .offset(limit * (page - 1));
        }
      }else{
        var vehicles = await connection('vehicle')
          .select('*')
          .limit(limit)
          .offset(limit * (page - 1));;
      }
    }
      response.header('X-Total-Count',count['count(*)'])
      return response.json(vehicles);
  },

  async create(request, response) {
    const { licensePlate, chassis, renavam, model, brand, year } = request.body;
    try{
      const [id] =  await connection('vehicle').insert({
      licensePlate,
      chassis,
      renavam,
      model,
      brand,
      year
    })

    return response.status(200).json({ info: "Veículo cadastrado com sucesso!", id  });
    }catch(error){
      return response.json({error})
    }
   
  },

  async update(request, response) {
    const { id } = request.params 
    const { licensePlate, chassis, renavam, model, brand, year } = request.body;
    try{
      const resp = await connection('vehicle').where('id','=',id)
        .update({
          licensePlate, 
          chassis, 
          renavam, 
          model, 
          brand, 
          year 
        })
      return resp > 0 
      ? response.status(200).json({info:"Veículo atualizado com sucesso!", resp})
      : response.status(406).json({info:"Não foi possível atualizar, o item solicitado não existe no banco de dados."})
    }catch(error){
      return response.json({error})
    }
  },

  async delete(request, response){
    const {id} = request.params;
    try{
      const resp = await connection('vehicle').where('id','=', id)
        .del()
      return resp > 0 
      ? response.status(200).json({info: "Deleção realizada com sucesso!", resp})
      : response.status(406).json({info:"Não foi possível deletar, o item solicitado não existe no banco de dados."})
    }catch(error){
      return response.json({error})
    }
  }
};
