import fetch from 'node-fetch';

const getRequestedData = async(url, token, limit) => {
 try {
  const response = await fetch(`${url}`);
  const data = await response.json();
  if(data){
    return data;
  }
 } catch (error) {
   return "something went wrong"
 }
}

export default getRequestedData;