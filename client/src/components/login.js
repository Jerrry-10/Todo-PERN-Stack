import React,{useState,Fragment} from "react";

const Login = () =>{
    const[name,Setname] = useState("")
     const[password,Setpassword] = useState("")
     const[email,Setemail] = useState("")
    const onSubmitFrom = async e =>{
        e.preventDefault();
        try{
            const body = {name,password,email}
            const response = await fetch("http://localhost:5000/users", {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
            window.location = "/";
        }catch(err){
            console.error(err.messenge)
        }
    }
    return <Fragment>
    <h1 className="test-center mt-5"> Login</h1>
    <form className="d-flex mt-5" onSubmit={onSubmitFrom}>
            <input type="text" className="form-control" value={name} onChange={e => Setname(e.target.value)}/><br></br>
            <input type="text" className="form-control" value={email} onChange={e => Setemail(e.target.value)}/><br></br>
            <input type="text" className="form-control" value={password} onChange={e => Setpassword(e.target.value)}/><br></br>
            <button className="btn btn-success">Add</button>
        </form>
</Fragment>
}


export default Login 