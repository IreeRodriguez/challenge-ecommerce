import React, { Component } from 'react';
import Cart from './Cart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            cartProducts: [],
            products:[],
            isLoading: true
        };
    }

    componentWillMount() {

        fetch('http://localhost:1337/items')
            .then(response => response.json())
            .then(data =>
                data.catalog.map(prod => ({
                    id: prod.id,
                    price: prod.price,
                    imageURL: prod.imageURL,
                    name: prod.name,
                }))

            )
            .then(products =>
                this.setState({
                    products,
                    isLoading: false
                })
            )
            .catch(error => console.log(error));
    }

    addCart(event) {
        console.log(event.target.name);
        const id = event.target.name;
        const products = this.state.products;
        const results = products.filter(products => products.id == id);
        const newState = this.state.cartProducts;
        const newCart = newState.push(results);
        console.log(newCart);
        console.log(newState);
        
        this.setState({
            cartProducts: newState
        })
        // this.state.cartProducts.push(results);
        

        
    }

    render() {
        console.log(this.state);
        const { isLoading } = this.state;
        const { products } = this.state;
        const { cartProducts } = this.state;
        console.log(products.length);       

        return (
            <div>
                <Cart cart={cartProducts}/>
                {
                    isLoading === false && products.length > 0 ? products.map(prod => {                        
                        return ( 
                        <div key={prod.id}>
                            <img src={prod.imageURL} alt=""/>
                            <p>{prod.name}</p>
                            <p>${prod.price}</p>
                            <button name={prod.id} onClick={this.addCart.bind(this)}>Add to Cart</button>
                            {/* <a href="#" onClick={this.submitCategory.bind(id)} value={id}>{categories}</a> */}
                        </div>)
                    }) : null
                }

            </div>
        );
    }
}

export default Home;