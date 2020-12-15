import React, { useEffect, useState } from 'react';
import Modal from 'react-awesome-modal';
import { StaticMap } from 'react-map-gl';
import { IconLayer } from '@deck.gl/layers'
import DeckGL from '@deck.gl/react';
import { MapView } from '@deck.gl/core';


export default function PopupMap(props) {
  let INITIAL_VIEW_STATE = props.view || {
    longitude: -40.361861,
    latitude: -14.524967,
    zoom: 2,
    maxZoom: 20,
  };

  let MAP_VIEW = new MapView({ repeat: true });

  let ICON_MAPPING = {
    marker: { x: 0, y: 0, width: 128, height: 128, mask: true }
  };

  let MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json';

  let [dado, setaDado] = useState(0);

  useEffect(() => {
    setaDado(props.data);
  }, []);

  const layer = new IconLayer({
    id: 'icon-layer',
    data: dado,
    pickable: true,
    iconAtlas: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/icon-atlas.png',
    iconMapping: ICON_MAPPING,
    sizeScale: 50,
    getIcon: d => 'marker',
    getPosition: d => {
      return d.lngLat;
    },
    getColor: d => [Math.sqrt(d.exits), 200, 80],

  })

  return (
    <section>
      <Modal visible={props.visible} width="800" height="600" effect="fadeInUp" onClickAway={props.onClickAway}>
        <DeckGL layers={[layer]}
          views={MAP_VIEW}
          initialViewState={INITIAL_VIEW_STATE}
          controller={{ dragRotate: false }}
          onClick={({ lngLat }) => {
            setaDado([{ lngLat }]);
            props.onClick(lngLat);
          }}
        >
          <StaticMap reuseMaps mapStyle={MAP_STYLE} preventStyleDiffing={true} />
        </DeckGL>
      </Modal>
    </section>

  );
}