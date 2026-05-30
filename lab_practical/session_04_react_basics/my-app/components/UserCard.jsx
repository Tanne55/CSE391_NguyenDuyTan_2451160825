export default function UserCard(name, email, avatar){
    return (
        <div style={{ border: "1px solid #ddd", borderRadius: "8px", padding: "15px", margin: "10px" }}>  
            <img src={avatar} alt={name} />
            <p><b>Name:</b> {name}</p>
            <p><b>Email:</b> {email}</p>
        </div>
    );
}