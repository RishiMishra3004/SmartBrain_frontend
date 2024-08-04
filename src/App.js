import React, {Component} from 'react';
import Clarifai from 'clarifai';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/navigation/Navigation';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Logo from './components/logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import ParticlesBg from 'particles-bg'
import './App.css';

window.process = {
      ...window.process,
    };

const app = new Clarifai.App({
    apiKey: <api key>,
});

const model = {
    id: 'face-detection',
    name: 'face-detection',
    version: '6dc7e46bc9124c5c8824be4822abe105',
    type: 'visual-detector',
}

class App extends Component {
    constructor(){
        super();
        this.state = {
            input: '',
            imageUrl: '',
            box: {},
            route: 'signin',
            isSignedIn: false,
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);

        return {
            leftcol: clarifaiFace.left_col * width,
            toprow: clarifaiFace.top_row * height,
            rightcol: width - (clarifaiFace.right_col * width),
            bottomrow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        this.setState({box: box});
    }
     
    onInputChange = (event) => {
        this.setState({input: event.target.value});
    }

    onButtonSubmit = () => {
        this.setState({imageUrl: this.state.input});
        app.models.predict(model, this.state.input)
        .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
        .catch(err => console.log(err));
    }
    
    onRouteChange = (route) => {
        if(route === 'signout'){
            this.setState({isSignedIn: false})
        }
        else if(route === 'home'){
            this.setState({isSignedIn: true});
        }
        this.setState({route: route});
    }

    render() {
       const { isSignedIn, imageUrl, route, box } = this.state;
        return (
            <div className="App">
                <ParticlesBg color="#FFFFFF" num={150} type="cobweb" bg={true} />
                <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
                { route === 'home' 
                    ?
                    <div> 
                        <Logo />
                        <Rank />
                        <ImageLinkForm onInputChange={this.onInputChange}
                                    onButtonSubmit={this.onButtonSubmit}/>
                        <FaceRecognition box={box} 
                                        imageUrl={imageUrl} />
                    </div>
                    
                    : (route === 'signin'
                        ? <Signin onRouteChange={this.onRouteChange} />
                        : <Register onRouteChange={this.onRouteChange} />
                    )
                }
            </div>
        );
    }  
};

export default App;
