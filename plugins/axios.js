export default function ({ $axios, $config, store }) {
  $axios.defaults.timeout = 60000
  $axios.defaults.baseURL = $config.API_URL

  if (store.state.token) {
    $axios.setHeader('Authorization', `Bearer ${store.state.token}`)
  }

  $axios.defaults.paramsSerializer = (paramObj) => {
    const params = new URLSearchParams()
    for (const key in paramObj) {
      params.append(key, paramObj[key])
    }
    return params.toString()
  }

  // $axios.defaults.baseURL = 'http://192.168.0.132:8080'
// disable redirect to error.vue
// app.nuxt.error = (err) => {
//     if (
//       err &&
//         store &&
//         store.state &&
//         store.state.apiUrl &&
//         err.config &&
//         err.config.baseURL === store.state.apiUrl
//     )
//     return;
//     if (err && err.message) {
//     if (err.statusCode === 401 || err.message.includes('401')) {
//             // app.router.app.flashMessage.error({
//             //     message: '세션이 만료되었습니다. 다시 로그인해주세요.',
//             // })
//             alert('세션이 만료되었습니다. 다시 로그인해주세요.');
//         } else {
//             // app.router.app.flashMessage.error({
//             //     message: err.message,
//             // })
//         }
//     }
// };
// $axios.onRequest((config) => {
//     if (store.state.token) {
//         $axios.setToken(store.state.token, 'Bearer');
//     }
// });
// $axios.onError((err) => {
//     const {response: res} = err;
//     let {
//         response: {
//             data: {message, error},
//         },
//     } = err;
//     //let message = error
//     let errorMsg = error ? error : message;
//     if (res.status === 401) {
//         alert('세션이 만료되었습니다. 다시 로그인해주세요.');
//         store.dispatch('logout');
//         app.router.push('/auth/login');
//         return;
//     }
//     if (errorMsg) {
//         alert('현재 데이터를 조회 할 수 없습니다.');
//         app.router.go(-1);
//     }
// });
}
