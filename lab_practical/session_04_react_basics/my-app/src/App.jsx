import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import UserCard from '../components/UserCard'
import './App.css'

function App() {
  const users = [
    {id: 1, name: "John Doe", email: "john.doe@example.com", avatar: "https://via.placeholder.com/150"},
    {id: 2, name: "Jane Smith", email: "jane.smith@example.com", avatar: "https://via.placeholder.com/150"},
    {id: 3, name: "Jim Beam", email: "jim.beam@example.com", avatar: "https://via.placeholder.com/150"},
  ]
  return (
    <>
    {users.map((user) => (
      <UserCard key={user.id} name={user.name} email={user.email} avatar={user.avatar} />
    ))}
    </>
  );
}

export default App
