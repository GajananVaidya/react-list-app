import { useEffect, useState } from "react";
import styles from './CompanyList.module.css';
import companyService from "../../services/company.service";

function CompanyList() {
    const [users, setUsers] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setErr] = useState(null);
    const [currentUser, setcurrentUser] = useState({name:'', company:{name: ''}, address:{suite:'', street:'', city:'', zipcode:''}});
    const [showData, setShowData] = useState(false);
    const onClick = (userData: any) => {
      setcurrentUser(userData);
      setShowData(true)
    } 

    useEffect(() => {
      const getUsers = () => {
        companyService.getAll()
            .then(res => {
                if (res.status >= 400) {
                    throw new Error("Server responds with error!")
                }
                return res.json()
            })
            .then(users => {
                setUsers(users)
                setIsLoaded(true)
            },
            err => {
                setErr(err.message)
                setIsLoaded(true)
            })
      };
      getUsers()
    }, []);

    const Results = () => (
      <div id="results" className={styles.ResultDiv}>
        <div>{currentUser.name}</div>
        <div>{currentUser.company.name}</div> 
        <div>{currentUser.address.suite}, {currentUser.address.street}, {currentUser.address.city}, {currentUser.address.zipcode}</div> 
      </div>
    )
    
    if (error) {
        return <div data-testid="errorField" className={styles.ListWrapper}> {error} </div>
    } else if (!isLoaded) {
        return <div className={styles.ListWrapper}> Loading... </div>
    } else {
        return (
          <div data-testid="CompanyList" className={styles.ListWrapper}>
            { showData ? <Results /> : null }
            <table>
              <thead>
                <tr>
                  <td>Name</td>
                  <td>Email</td>
                  <td>Phone</td>
                  <td>Website</td>
                </tr>
              </thead>
              <tbody>
                {users.map(user => {
                    const { id, name, email, phone, website } = user;
                    return (
                      <tr key={id} onClick={() => onClick(user)}>
                        <td>{name}</td>
                        <td>{email}</td>
                        <td>{phone}</td>
                        <td>{website}</td>
                      </tr>
                    )
                  } 
                )}
              </tbody>
            </table>
          </div>
          
        )
    }
};

export default CompanyList;