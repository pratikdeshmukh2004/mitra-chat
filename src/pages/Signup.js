import React from 'react';

function RegisterPage() {
  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{ backgroundImage: `url('/images/login_cover.jpg')` }}>
      <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-bl from-transparent via-gray-900 to-black bg-opacity-30" style={{ backdropFilter: 'blur(5px)' }}>
        <div class="flex flex-row h-16 mt-10">
          <img class="h-8 w-auto" src="/logo192.png" alt="Logo" />
          <span class="text-white font-bold text-xl ml-2">Mitra Chat</span>
        </div>
      </div>
    </div>

  );
}

export default RegisterPage;
