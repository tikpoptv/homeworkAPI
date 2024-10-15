import React, { useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

const UserSearch: React.FC = () => {
  const [name, setName] = useState(''); // คำค้นหา
  const [users, setUsers] = useState<User[]>([]); // ผลลัพธ์การค้นหา
  const [loading, setLoading] = useState(false); // สถานะการโหลดข้อมูล
  const [error, setError] = useState(''); // ข้อผิดพลาดในการดึงข้อมูล
  const [searched, setSearched] = useState(false); // สถานะว่าเคยค้นหาหรือยัง

  // ฟังก์ชันสำหรับการค้นหาตามชื่อ
  const handleSearch = async () => {
    setLoading(true);
    setError('');
    setSearched(true); // ตั้งค่าว่าได้ทำการค้นหาแล้ว
  
    try {
      console.log("Calling API:", `${process.env.REACT_APP_API_URL}/users/search?name=${name}`); // ตรวจสอบ URL
      const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users/search`, {
        params: { name },
      });
  
      console.log("Response Data:", response.data); // ตรวจสอบผลลัพธ์ที่ได้จาก API
      setUsers(response.data); // ตั้งค่าผู้ใช้ที่ค้นพบ
    } catch (error) {
      console.error("Error fetching users:", error); // แสดงข้อผิดพลาดถ้ามี
      setError('Error fetching users');
    } finally {
      setLoading(false); // การโหลดข้อมูลเสร็จสิ้น
    }
  };
  

  // ฟังก์ชันสำหรับการดึงข้อมูลผู้ใช้ทั้งหมด
  const handleFetchAllUsers = async () => {
    setLoading(true);
    setError('');
    setSearched(true); // ตั้งค่าว่าได้ทำการค้นหาแล้ว

    try {
      const response = await axios.get<User[]>(`${process.env.REACT_APP_API_URL}/users`);
      setUsers(response.data); // ตั้งค่าผู้ใช้ทั้งหมด
    } catch (error) {
      setError('Error fetching all users'); // ถ้ามีข้อผิดพลาดในการเชื่อมต่อกับ API
    } finally {
      setLoading(false); // การโหลดข้อมูลเสร็จสิ้น
    }
  };

  return (
    <div>
      <h1>Search Users</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter user name"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleFetchAllUsers}>ดึงข้อมูลทั้งหมด</button> {/* ปุ่มดึงข้อมูลทั้งหมด */}

      {loading && <p>Loading...</p>} {/* แสดงข้อความขณะกำลังดึงข้อมูล */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* แสดงข้อผิดพลาด */}

      {!searched && <p>Not found</p>} {/* ขึ้นข้อความนี้ก่อนที่จะทำการค้นหา */}
      
      {searched && !loading && users.length === 0 && <p>ไม่พบข้อมูล</p>} {/* ถ้าค้นหาแล้วไม่พบข้อมูล */}

      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserSearch;
