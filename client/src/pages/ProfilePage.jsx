import React from 'react'

const ProfilePage = () => {
  return (
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center
    justify-center'>
      <div className='w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-=sm:flex-col-reverse
      rounded-lg'>
        <form className='flex flex-col gap-5 p-10 flex-1'>
          <h3>Profile details</h3>
          <label htmlFor="avatar">
              <input type="text" />
              <img src="" alt="" />
          </label>
        </form>
         <img src="" alt="" />
      </div>
    </div>
  )
}

export default ProfilePage
