import React, { Component } from 'react'

class Products extends Component {
    imageClick = () => {
        this.state.shown="none";
        console.log(this.state.shown);
      } 
      toggle() {
		this.setState({
			shown: !this.state.shown
		});
	} 

    constructor() {
        super()
        this.state = {
            clicks:0,
            productName: '',
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentWillMount() {

    }
    IncrementItem = () => {
        this.setState({ clicks: this.state.clicks + 1 });
      }
      DecreaseItem = () => {
        this.setState({ clicks: this.state.clicks - 1 });
      }
    handleChange(event) {
        const { name, value } = event.target
        this.setState({ [name]: value })


    }

    handleClick() {
        console.log("state", this.state)
        const prodName = {
            "search": this.state.productName
        }
        console.log(prodName)
        fetch('http://beta-zepnur.teve.cloud/v2/search?page=0', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'x-anonymous': 'zepnur',
                'x-cloud-id': '1002'

            },
            body: JSON.stringify(prodName)
        }).then(res => res.json()).then(res => {
            this.setState({ ...res.search_result })
        })
        

    }

    render() {
        var shown = {
			display: this.state.shown ? "block" : "none"
		};
        return (
        <div>
            <div class="topnav">
  <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a>
</div>

                <br></br>
                {console.log(this.state)}
                <div class="center container">
                <input
                    type="text"
                    name="productName"
                    value={this.props.productName}
                    onChange={this.handleChange}
                    placeholder="Enter the Product Name"
                />
                <br></br>
                <br></br>
                <button type="submit btn-success " onClick={this.handleClick} > Submit </button>
                </div>
                <div className="d-flex justify-content-around flex-wrap" >
                {this.state.hits && this.state.hits.hits.map(hit =>    
                <div className="products w-25 h-0 m-5">
                    <div className="prodName">
                        {hit._source.inventory_name}
                    </div>
                    <div className="image">
                         <img src={'https://api.zepnurhealth.com/image/' + hit._source.sku_image.split(",")[0] + '?token=eyJzaXplIjoieDMwMCIsImNsb3VkX2lkIjoiMTAwMiJ9'} width="300" height="300" onClick={this.toggle.bind(this)}/>
                    </div>
                    <div style={ shown } >
                        Description:
                        <div  className="" > {hit._source.description } </div>
                        
                        <button onClick={this.IncrementItem}><img src={"https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.symbols.com%2Fgi.php%3Ftype%3D1%26id%3D1608%26imgrefurl=https%3A%2F%2Fwww.symbols.com%2Fsymbol%2Faddition%26docid=8U_Gn6I1d3PjlM%26tbnid=Oyo_GaiOm2A23M%3A%26vet=10ahUKEwjZ87CpnavkAhVTAXIKHZ3LDpYQMwhpKAgwCA..i%26w=500%26h=500%26bih=657%26biw=1366%26q=image%20of%20addition%20sign%26ved=0ahUKEwjZ87CpnavkAhVTAXIKHZ3LDpYQMwhpKAgwCA%26iact=mrc%26uact=8"} alt="+"></img></button>
                        <h2> { this.state.clicks }</h2>
                        <button onClick={this.DecreaseItem}>Click to decrease by 1</button>
                    </div>
                </div>
                )}
                </div>

            </div>
        )
    }
}


export default Products
