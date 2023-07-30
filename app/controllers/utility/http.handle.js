const axios = require('axios');

module.exports.postJsonData = async(url,json) => {
  const data = JSON.stringify(json);
  const res = await axios({
                      method:'post',
                      maxBodyLength:Infinity,
                      url:url,
                      headers: { 
                        'Content-Type': 'application/json'
                      },
                      data:data
                    });
  return res;
};

module.exports.postJsonDataWithAuthorization = async(url,json,token) => {
  const data = JSON.stringify(json);
  const res = await axios({
                          method:'post',
                          maxBodyLength:Infinity,
                          url:url,
                          headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer '+token
                          },
                          data:data
                        });
  return res;
};