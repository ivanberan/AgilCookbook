import { Link } from "react-router-dom";


const RecipeCard = (props) => {
    return (
        <div className="col-md-3 pb-1">
            <div className="card">
                <div className="card-body" >
                    <h5 className="card-title">{props.data.name}</h5>
                    {props.data.img ?
                        <img src={props.data.img} className="img-fluid rounded-circle"  alt="..."></img>
                        : <img src="https://img.freepik.com/free-vector/meatball-food-cartoon-your-business_98143-42.jpg" className="img-fluid rounded-circle" alt="..."></img>}
                    <p className="card-text">
                        <strong>Ingredients: </strong>{props.data.ingredients.join(", ")}
                    </p>
                    <div className="row">
                        <Link to={"/recipe/" + props.data._id} className="btn btn-outline-secondary col-lg-5 mx-1 mb-1">
                            Show details
                        </Link>
                        <a onClick={() => props.deleteFunction(props.data._id)} className="btn btn-danger col-lg-5 mx-1 mb-1">Delete</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecipeCard