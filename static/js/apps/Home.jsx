import React, { Component } from 'react';
import Cart from './Cart';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            cartProducts: [],
            products: [],
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
        console.log(results[0]);

        const newCart = newState.push(results[0]);
        console.log(newCart);

        this.setState({
            cartProducts: newState
        })
    }

    removeFromCart(event) {
        console.log(event.target);
        console.log(this.state);
        const cart = this.state.cartProducts;

        const id = event.target.name;
        console.log(id);
        
        const newCart = cart.filter(function (el) {
            return el.id != id;
        });

        console.log(newCart);
        
        this.setState({
            cartProducts: newCart
        })
    }

    render() {

        console.log(this.state);
        const { isLoading } = this.state;
        const { products } = this.state;
        const { cartProducts } = this.state;
        console.log(products.length);
        return (
            <div>
                <Cart cart={cartProducts} click={this.removeFromCart.bind(this)} />
                {
                    isLoading === false && products.length > 0 ? products.map(prod => {
                        return (
                            <div key={prod.id}>
                                <img src={prod.imageURL} alt="" />
                                <p>{prod.name}</p>
                                <p>${prod.price}</p>
                                <button name={prod.id} onClick={this.addCart.bind(this)}>Add to Cart</button>
                            </div>)
                    }) : null
                }

            </div>
        );
    }
}

export default Home;