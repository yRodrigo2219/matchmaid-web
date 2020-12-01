import WhiteThing from '../../components/WhiteThing';
import ReactMapBox,{Layer, Feature} from 'react-mapbox-gl';

import {IconLayer} from '@deck.gl/layers'

import './Busca.css'
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ReactMapBox({
    accessToken: 'pk.eyJ1Ijoiam9hb2ZmeGlpIiwiYSI6ImNraTY5OXhuOTA0c2gyeG56MnZ2YjhnaDMifQ.bYr_CV_ewEHicjHgBgpgDg'
});

const INITIAL_VIEW_STATE ={
    longitude: -14.576,
    latitude: -40.35329819,
    zoom: 13,
    pitch: 0,
    bearing: 0
}

const ICON_MAPPING = {
    marker: {x: 0, y: 0, width: 128, height: 128, mask: true}
  };

const data = [
    {sourcePosition: [-14.576,-40.35329819], targetPosition:[-14.576,-40.35329819]}
]

const layers = new IconLayer({
    id: 'icon-layer', 
    data,
    pickable: true,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    getIcon: d => 'marker',
    sizeScale: 15,
    getPosition: d => d.coordinates,
    getSize: d => 5,
    getColor: d => [Math.sqrt(d.exits), 140, 0]
})


export default function Busca(){
    
    return (
        <div className='content busca'>
            <WhiteThing>

            </WhiteThing>
        
            <Map className='map' style={'mapbox://styles/mapbox/streets-v9'} state={INITIAL_VIEW_STATE}>
                <Layer type='symbol' id='marker' layout={{"icon-image":"marker-15"}}>
                    <Feature coordinates={INITIAL_VIEW_STATE.longitude,INITIAL_VIEW_STATE.latitude}></Feature>
                </Layer>
            </Map>    
        </div>
    );
}