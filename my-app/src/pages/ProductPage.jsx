import { useAuth } from '../context/AuthContext';
import ProductList from '../components/ProductList';

const ProductsPage = () => {
    const { user, logout } = useAuth();

    return (
        <div>
            <div>
                <span>Welcome, {user?.name}</span>
                <button onClick={logout}>Logout</button>
            </div>
            <ProductList />
        </div>
    );
};

export default ProductsPage;