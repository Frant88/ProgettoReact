import "../../index.css";

function Card({imgUrl}){
    return (
        <div className="overflow-hidden rounded-lg shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <img src={imgUrl} />
        </div>
    )
}
export default Card