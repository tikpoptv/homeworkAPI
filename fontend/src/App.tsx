import React, { useState, useEffect } from 'react';
const API_URL = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
  // state สำหรับเก็บข้อมูลการค้นหาและผลลัพธ์
  const [id, setId] = useState<string>('');           // สำหรับเก็บค่าค้นหาด้วย ID
  const [productID, setProductID] = useState<string>(''); // สำหรับเก็บค่าค้นหาด้วย productID
  const [name, setName] = useState<string>('');       // สำหรับเก็บค่าค้นหาด้วย name
  const [users, setUsers] = useState<any[]>([]);      // สำหรับเก็บผลลัพธ์การค้นหา
  const [notFound, setNotFound] = useState<boolean>(false); // สถานะไม่พบข้อมูล

  // ฟังก์ชันสำหรับค้นหาผู้ใช้
  const handleSearch = async () => {
    try {
      let query = '';
      if (id) query += `id=${id}&`;
      if (productID) query += `productID=${productID}&`;
      if (name) query += `name=${name}&`;

      if (query.length === 0) {
        setNotFound(true); // ถ้าไม่มีการกรอกช่องไหนเลย
        return;
      }

      const response = await fetch(`${API_URL}/search?${query}`);
      if (response.ok) {
        const data = await response.json();
        if (data.length > 0) {
          setUsers(data);
          setNotFound(false);
        } else {
          setUsers([]);
          setNotFound(true);
        }
      } else {
        setNotFound(true); 
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setNotFound(true); 
    }
  };

  // ฟังก์ชันสำหรับดึงข้อมูลทั้งหมด
  const handleShowAll = async () => {
    try {
      console.log('Fetching from API:', API_URL);  // ตรวจสอบว่า API_URL ถูกต้องหรือไม่
      const response = await fetch(API_URL || ''); 
      if (response.ok) {
        const data = await response.json();
        console.log('Data fetched:', data);  
        setUsers(data);  
        setNotFound(false);  
      } else {
        setNotFound(true); 
      }
    } catch (error) {
      console.error('Error fetching all users:', error);
      setNotFound(true); 
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>User Search</h1>
      <h1>{API_URL}</h1>

  
      <input
        type="text"
        value={id}
        onChange={(e) => setId(e.target.value)}
        placeholder="Search by ID"
        style={{ marginRight: '10px' }}
      />


      <input
        type="text"
        value={productID}
        onChange={(e) => setProductID(e.target.value)}
        placeholder="Search by productID"
        style={{ marginRight: '10px' }}
      />

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Search by name"
      />


      <button onClick={handleSearch}>Search</button>

  
      <button onClick={handleShowAll} style={{ marginLeft: '10px' }}>Show All</button>

      <div style={{ marginTop: '20px' }}>
        {notFound ? (
          <p>No data found.</p>
        ) : (
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.name} - {user.email} - {user.productID} - {user.active ? 'Active' : 'Inactive'}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default App;
