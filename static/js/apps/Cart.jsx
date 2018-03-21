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
        
        const { cart } = this.props;
        const { click } = this.props;
        return (
            <div>
                {
                    cart.map(prod => {
                        console.log(prod);
                        
                        return (
                            <div key={prod.id}>
                                <img src={prod.imageURL} alt="" />
                                <p>{prod.name}</p>
                                <p>${prod.price}</p>
                                <button name={prod.id} onClick={click.bind(this)}>Remove from Cart</button>
                                {/* <a href="#" onClick={this.submitCategory.bind(id)} value={id}>{categories}</a> */}
                            </div>)
                    })
                }

            </div>
        );
    }
}

export default Cart;