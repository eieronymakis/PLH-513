fetch('http://127.0.0.1/user/info')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById("username").innerHTML = data.username.toLowerCase()+` (${data.role})`;
  });

fetch('http://127.0.0.1/subscriptions/notifications')
  .then((response) => response.json())
  .then((data) => {
    if(data.length > 0){
      document.getElementById('notificationText').innerHTML = data[0].message;
      document.getElementById('notificationRemove').setAttribute( "onClick", `removeNotification('${data[0]._id}');` );
      const toast = new bootstrap.Toast(document.getElementById('orionNotification'))
      toast.show()
      console.log(data);
    }
  })
  .catch((error)=>{
    console.log(error);
  })

function removeNotification(nid){
  fetch(`http://127.0.0.1/subscriptions/notifications/delete/${nid}`, { method: 'DELETE' })
}



