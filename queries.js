const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'gis_simple',
  password: 'admin',
  port: 5432,
})
//https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
//https://www.freecodecamp.org/news/securing-node-js-restful-apis-with-json-web-tokens-9f811a92bb52/
//https://code.tutsplus.com/tutorials/how-to-use-ajax-in-php-and-jquery--cms-32494
const getUsers = (request, response) => {
    pool.query('SELECT * FROM public."user" ', (error, results) => {
      if (error) {
        throw error
      }
      
      response.status(200).json(results.rows)
    })
  }

  const getUserById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM "user" WHERE user_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  // const getIconsByName = (request, response) => {
  //   const name = request.params.name
  //   console.log(name)
  //   pool.query('SELECT * FROM public.pdi_icon WHERE name = $1', [name], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     console.log(results.rows)
  //     response.status(200).send(results.rows)
  //   })
  // }
  const getDevices = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public.devices', (error, results) => {
      if (error) {
        throw error
      }
      let jsonvar = {"data":[]}
      results.rows.forEach(function (value) {
        // console.log(value);
        jsonvar["data"].push([value.input,value.label])
        // console.log([value.input,value.label])
      });
      console.log(jsonvar)
      response.status(200).json(jsonvar)
    })
  }
  const getDevice = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public.device', (error, results) => {
      if (error) {
        throw error
      }
      let jsonvar = {"data":[]}
      results.rows.forEach(function (value) {
        console.log(value);
        var device_id = value.device_id;
        var identifier = value.identifier;
        var name = value.name;
        var input =`<input name='device[]' value="${identifier}" type="checkbox" class="uniform device_check_once" name=${name} id="select_device_${device_id}"/>`;
        var label = `"<label for="select_device_${device_id}">${name}</label><p style="display:none">${identifier}</p>"`;
        // var input2 =`<input type="checkbox" style="display:none;"/>`;
        jsonvar["data"].push([input,label])
      });
      // console.log(jsonvar)
      response.status(200).json(jsonvar)
    })
  }

  const getIcons = (request, response) => {
    pool.query('SELECT * FROM public.pdi_icon ', (error, results) => {
      if (error) {
        throw error
      }
      let jsonvar = [];
      results.rows.forEach(function (value) {
        var id = value.pdi_icon_id;
        var name = value.name;
        var url = `http://localhost:3000/images/${name}`;
        let option = `<option value="${id}">${name}</option>`;
        jsonvar.push(option);
      })
      response.status(200).json(jsonvar)
    })
  }


  const getPdi = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM public.pdi', (error, results) => {
      if (error) {
        throw error
      }
      let jsonvar = {"data":[]}
      results.rows.forEach(function (value) {
        console.log(value);
        // <input value="431" type="checkbox" class="uniform pdi_check_once" name="pdi[]" id="select_pdi_431">
	      // <div style="position:relative; display:block;"> <label for="select_pdi_431">10 MARS</label> <div class="pdi-list-actions"> <a class="pdi-edit-item btn btn-sm bs-tooltip" data-id="431" href="#" data-original-title="Modifier" title=""><i class="icon-pencil"></i></a> <a class="pdi-delete-item btn btn-sm bs-tooltip" data-id="431" href="#" data-original-title="Supp." title=""><i class="icon-remove"></i></a> </div> </div>
        var pdi_id = value.pdi_id;
        var name = value.name;
        var input =`<input value="${pdi_id}" type="checkbox" class="uniform pdi_check_once" name="pdi[]" id="select_pdi_${pdi_id}"/>`;
        var label = `<label for="select_pdi_${pdi_id}">${name}</label> `;
        // var input2 =`<input type="checkbox" style="display:none;"/>`;
        jsonvar["data"].push([input,label])
      });
      // console.log(jsonvar)
      response.status(200).json(jsonvar)
    })
  }
  const getPdiById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pdi WHERE pdi_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  const getIconById = (request, response) => {
    const id = parseInt(request.params.id)
  
    pool.query('SELECT * FROM pdi_icon WHERE pdi_icon_id = $1', [id], (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    })
  }
  // const getPdiById = (request, response) => {
  //   const { pdi_id } = request.body
  //   console.log(request.body)
  
  //   pool.query('select * FROM pdi WHERE pdi_id = $1', [pdi_id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
      
  //     response.status(201).send(`pdi `)
  //   })
  // }

  // const createDevice = (request, response) => {
  //   const { device_id, identifier, imei_carte_sim, num_appel, user_id, tank, odometer_start, name, device_model, sonde_gasoil, door, commande, report_temperature, canbus, device_canbus_speed, device_canbus_odometre, data_push, data_push_sonde_inversed, groupe_froid, voltage_min, voltage_max, voltage_polarity, en_panne, timezone_add,date_last_update, date_insert, immatriculation, description, consommation, evolue, device_marque, vehicule_marque, vehicule_type, consomation_theorique, consomation_petrolie, conducteurs_id } = request.body
  //   console.log(request.body)
  
  //   pool.query('INSERT INTO public.device (device_id, identifier, imei_carte_sim, num_appel, user_id, tank, odometer_start, name, device_model, sonde_gasoil, door, commande, report_temperature, canbus, device_canbus_speed, device_canbus_odometre, data_push, data_push_sonde_inversed, groupe_froid, voltage_min, voltage_max, voltage_polarity, en_panne, timezone_add,date_last_update, date_insert, immatriculation, description, consommation, evolue, device_marque, vehicule_marque, vehicule_type, consomation_theorique, consomation_petrolie, conducteurs_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36)', [device_id, identifier, imei_carte_sim, num_appel, user_id, tank, odometer_start, name, device_model, sonde_gasoil, door, commande, report_temperature, canbus, device_canbus_speed, device_canbus_odometre, data_push, data_push_sonde_inversed, groupe_froid, voltage_min, voltage_max, voltage_polarity, en_panne, timezone_add,date_last_update, date_insert, immatriculation, description, consommation, evolue, device_marque, vehicule_marque, vehicule_type, consomation_theorique, consomation_petrolie, conducteurs_id], (error, results) => {
  //     if (error) {
  //       throw error
  //     }
  //     response.status(201).send(`User added with ID: ${request.device_id}`)
  //   })
  // }
  const createDevice = (request, response) => {
    const { device_id, identifier, imei_carte_sim, num_appel, name, immatriculation, description } = request.body
    console.log(request.body)
  
    pool.query('INSERT INTO public.device (device_id, identifier, imei_carte_sim, num_appel, name, immatriculation, description) VALUES ($1, $2, $3, $4, $5, $6, $7)', [device_id, identifier, imei_carte_sim, num_appel, name, immatriculation, description], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${request.device_id}`)
    })
  }
  const createPdi = (request, response) => {
    const { pdi_icon_id, name, description, latitude, longitude } = request.body
    console.log(request.body)
  
    pool.query('INSERT INTO public.pdi (pdi_icon_id, name, description, latitude, longitude) VALUES ($1, $2, $3, $4, $5)', [pdi_icon_id, name, description, latitude, longitude], (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`PDI added with ID: ${request.pdi_id}`)
    })
  }
// const updateUser = (request, response) => {
//     const id = parseInt(request.params.id)
//     const { name, email } = request.body
  
//     pool.query(
//       'UPDATE user SET first_name = $1, phone_number = $2 WHERE user_id = $3',
//       [name, email, id],
//       (error, results) => {
//         if (error) {
//           throw error
//         }
//         response.status(200).send(`User modified with ID: ${id}`)
//       }
//     )
// }


// const deleteUser = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     pool.query('DELETE FROM user WHERE user_id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).send(`User deleted with ID: ${id}`)
//     })
//   }

module.exports = {
    getUsers,
    getUserById,
    createDevice,
    // updateUser,
    // deleteUser,
    // getIconsByName,
    createPdi,
    getDevice,
    getPdi,
    getDevices,
    getIcons,
    getIconById,
    getPdiById
}