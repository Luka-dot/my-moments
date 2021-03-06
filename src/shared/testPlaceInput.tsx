import React, { useState } from 'react';
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

import './placesInput.css';

export function TestPlaceInput() {
    const [address, setAddress] = useState('')
    const [coordinance, setCoordinance] = useState()

    function handleChange(address) {
        setAddress(address)
    };

    function handleSelect(address) {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng, address), setCoordinance(latLng))
            .catch(error => console.error('Error', error));
        setAddress(address)
    };

    return (
        <PlacesAutocomplete
            value={address}
            onChange={handleChange}
            onSelect={handleSelect}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                <div >
                    <p>hey</p>
                    <input

                        {...getInputProps({
                            placeholder: 'Search Places ...',
                            className: 'location-search-input',
                        })}
                    />
                    <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map(suggestion => {
                            const className = suggestion.active
                                ? 'suggestion-item--active'
                                : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                                ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                : { backgroundColor: '#ffffff', cursor: 'pointer' };
                            return (
                                <div
                                    {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,

                                    })}
                                    key={suggestion.placeId}
                                >
                                    <span>{suggestion.description}</span>
                                    <span>{address}</span>

                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </PlacesAutocomplete>
    );
}

function latLng(latLng: any): any {
    throw new Error('Function not implemented.');
}
