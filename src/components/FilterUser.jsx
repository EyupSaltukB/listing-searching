import React, { useEffect, useRef, useState } from 'react'
import Loading from './Loading'

const FilterUser = () => {

    // ana kullanıcılar içindir. veriyi değiştirmiyoruz. kullanıcılar sabit.
    const [users, setUsers] = useState(null)
    // veriyi istediğimiz gibi değiştirip ekrana yansıtabiliriz.
    const [filtredUsers, setFiltredUsers] = useState(null)

    const inputRef = useRef()

    /* componentDidMount olayını izliyoruz */
    useEffect(() => {
        /* API isteği */
        fetch("https://jsonplaceholder.typicode.com/users")
            /* gelen verileri işleme */
            .then((res) => res.json())
            /* verileri state'e aktar */
            .then((data) => {
                // ana veriyi güncelleme
                setUsers(data)
                // yedek veriyi güncelleme
                setFiltredUsers(data)
            })
            /* hata oluşursa */
            .catch((err) => alert("Hata! Lütfen Daha Sonra Tekrar Deneyiniz."))
    }, [])
    /* console.log("users",users) */

    const handleClick = () => {
        // inputun değerine erişme
        // search = inputun değeri
        const search = inputRef.current.value.toLowerCase();

        // aratılan isme denk gelen kullanıcıları isme arama
        // includes ile içini kontrol etme
        const filtred = users.filter((user) => 
        user.name.toLowerCase().includes(search))

        if(filtred.length === 0){
            alert("Kullanıcı Bulunamadı")
        } 

        /* console.log(filtred); */
        setFiltredUsers(filtred)
    };

    return (
        <div className='d-flex flex-column align-items-center'>
            <h1 className='mt-3'>Kullanıcılar Listesi</h1>
           <div className='d-flex m-3 gap-2'>
           <input className='form-control' type="text" ref={inputRef}/>
           <button className='btn btn-success' onClick={handleClick}>Ara</button>
           </div>
            {/* 1) {users === null ? <Loading/> : ""} */}
            {filtredUsers === null ? <Loading/> : ""}
            <table className='table'>
                <thead className='bg-secondary'>
                    <tr>
                    <th>ID</th>
                    <th>İsim</th>
                    <th>Email</th>
                    <th>Şirket</th>
                    <th>Telefon</th>
                    <th>Adres</th>
                    <th>Website</th>
                    </tr>
                </thead>
                <tbody>
                    {/* 1) {users?.map((user) => ( */}
                    {filtredUsers?.map((user) => (
                    <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.company.name}</td>
                    <td>{user.phone}</td>
                    <td>{user.address.city}</td>
                    <td>{user.website}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default FilterUser;