const instance = axios.create({
  baseURL: 'http://localhost:33088/api',
  timeout: 10000,
});

// 사용하실때 fetchData 를 필요한 페이지에서 import해온후 fetchData('post','/todolist') 형식으로 사용하시면 됩니다.
async function fetchData(method, URL) {
  try {
    const response = await instance[method](URL);
    return response;
  } catch (error) {
    console.error(error, `${URL}오류`);
  }
}

export default fetchData;
