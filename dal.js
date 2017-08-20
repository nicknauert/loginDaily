const users = [
  {
    id: 1,
    username: 'nick',
    password: '1234'
  },
  {
    id: 2,
    username: 'calweb',
    password: 'calbo'
  }
]

function getUsers(){
  return users
}

function getUserByUsername(username){
  return users.find(function(item){
    if(username === item.username){
      return item
    }
  })
}

function addUser(usr, pass){
  let newUser = {}
  newUser.id = users.length+1;
  newUser.username = usr
  newUser.password = pass
  console.log(newUser);
  users.push(newUser);
}

module.exports = {
  getUserByUsername, getUsers, addUser


}
