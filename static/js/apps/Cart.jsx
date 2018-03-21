import React, { Component } from 'react';

class Cart extends Component {
    constructor(cart) {
        super(cart);
        this.state = {
            cart,
        };
    }

    render() {
        const { cart } = this.props;
        const { click } = this.props;
        return (
            <div>
                <div className="center">
                    {cart.length > 0 ?
                        <p className="counter">Total: $ {cart.reduce((acc, el) => acc + el.price, 0).toLocaleString()}</p> : null
                    }
                </div>
                <section id="cart">
                    {
                        cart.map(prod => {                
                            return (
                                <div key={prod.id} className="product">
                                    <img src={prod.imageURL} alt="" />
                                    <p>{prod.name}</p>
                                    <p>${prod.price}</p>
                                    <button name={prod.id} onClick={click.bind(this)} className="btn" >Remove from Cart</button>
                                    {/* <a href="#" onClick={this.submitCategory.bind(id)} value={id}>{categories}</a> */}
                                </div>)
                        })
                    }
                </section>
            </div>
        );
    }
}

export default Cart;