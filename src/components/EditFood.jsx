import { FaCheck } from "react-icons/fa";

const EditFood = ({ edit, setEdit }) => {
    return (
        <div>
            <button
                onClick={() => setEdit(!edit)}
                className="btn btn-outline btn-primary"
            >
                {edit ? <FaCheck /> : "Modifier"}
            </button>
        </div>
    );
};

export default EditFood;
