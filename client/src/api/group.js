import axios from 'axios'

export const getGroupsRequest = async() => await axios.get('/api/groups')
export const getGroupRequest = async(id) => await axios.get('/api/groups/' + id)

export const createGroupPostRequest = async(post) => {
  const form = new FormData();
  for (let key in post) {
    form.append(key, post[key]);
    console.log(key)
  }
  return await axios.post("/api/groups/post", form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}

export const createGroupRequest = async (group) => {
    const form = new FormData();
    for (let key in group) {
      form.append(key, group[key]);
      console.log(key)
    }
    return await axios.post("/api/groups", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export const joinGroupRequest = async (groupJoined) => {
    const form = new FormData();
    for (let key in groupJoined) {
      form.append(key, groupJoined[key]);
      console.log(key)
    }
    return await axios.post("/api/groups/join", form, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
}

export const searchGroupRequest = async(search) => {
  const form = new FormData()
  for(let key in search){
      form.append(key, search[key])
  }
  return await axios.post('/api/groups/search', form,{
      headers:{
          "Content-Type": "multipart/form-data",            
      }
  })
}