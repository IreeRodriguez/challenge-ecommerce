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
        const id = event.target.name;
        const products = this.state.products;
        const results = products.filter(products => products.id == id);
        const newState = this.state.cartProducts;
        const newCart = newState.push(results[0]);

        this.setState({
            cartProducts: newState
        })

        const result = this.state.cartProducts.reduce(function (a, b, c) {
            return { 'price': a.price + b.price };
        }).price;
    }

    removeFromCart(event) {
        const cart = this.state.cartProducts;
        const id = event.target.name;

        const newCart = cart.filter(function (el) {
            return el.id != id;
        });

        this.setState({
            cartProducts: newCart
        })
    }

    render() {
        const { isLoading } = this.state;
        const { products } = this.state;
        const { cartProducts } = this.state;
        return (
            <div>
                <Cart cart={cartProducts} click={this.removeFromCart.bind(this)} />
                <section id="products">
                    {
                        isLoading === false && products.length > 0 ? products.map(prod => {
                            return (
                                <div key={prod.id} className="product">
                                    <img src={prod.imageURL} alt="" />
                                    <p>{prod.name}</p>
                                    <p>${prod.price}</p>
                                    <button name={prod.id} onClick={this.addCart.bind(this)} className="btn" >Add to Cart</button>
                                </div>)
                        }) : null
                    }
                </section>
            </div>
        );
    }
}

export default Home;