import React from 'react'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }

  /*   const style = {
      color: notification.type === 'alert' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: 20,
      borderStyle: 'solid',
      borderRadius: 5,
      padding: '0 10 0 10',
      marginBottom: 10,
    } */


  return (
    <div id='notification' className={`alert ${notification.type === 'alert' ? 'alert-danger' : 'alert-success'} mt-3`}>
      <h4> {notification.message}</h4>
    </div>
  )
}

export default Notification