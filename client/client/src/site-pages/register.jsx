import { useState } from 'react';

export default function Register() {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    password: '',
  });