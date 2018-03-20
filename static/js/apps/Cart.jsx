import React, { Component } from 'react';

class Cart extends Component {
    constructor(cart) {
        super(cart);
        this.state = {
            cart,
        };
    }

    removeItem() {
        
    }

    render() {
        console.log(this.props.cart);
        
        const {cart} = this.props;
        return (
            <div>
                {
                    cart.map(prod => {
                        console.log(prod);
                        
                        return (
                            <div key={prod[0].id}>
                                <img src={prod[0].imageURL} alt="" />
                                <p>{prod[0].name}</p>
                                <p>${prod[0].price}</p>
                                <button name={prod[0].id} onClick={this.removeItem.bind(this)}>Remove from Cart</button>
                                {/* <a href="#" onClick={this.submitCategory.bind(id)} value={id}>{categories}</a> */}
                            </div>)
                    })
                }

            </div>
        );
    }
}

export default Cart;