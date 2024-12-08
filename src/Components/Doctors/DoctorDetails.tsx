import { useParams } from 'react-router-dom'

function DoctorDetails() {
    const {id} = useParams();
    console.log('hhhhhh',id);
    
  return (
    <div>{id}</div>
  )
}

export default DoctorDetails