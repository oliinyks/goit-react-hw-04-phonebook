import { useState } from 'react';

export default function useLocalSorage() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );

  return [contacts, setContacts] ;
};