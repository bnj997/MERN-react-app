import React, { useState, useEffect } from 'react';
import { useParams} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';

const DUMMY_PLACES = [
    {
      id: "p1",
      title: "The title",
      description: "The place",
      imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQGFl-WcfVNaKw/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=72jo394Yu130e4xplsWmA78aMGC8zrm_F0hWDHPeReg",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u1'
    },
    {
      id: "p2",
      title: "The title2",
      description: "The place2",
      imageURL: "https://media-exp1.licdn.com/dms/image/C4E03AQGFl-WcfVNaKw/profile-displayphoto-shrink_200_200/0?e=1595462400&v=beta&t=72jo394Yu130e4xplsWmA78aMGC8zrm_F0hWDHPeReg",
      address: "20 W 34th St, New York, NY 10001, United States",
      location: {
        lat: 40.7484405,
        lng: -73.9878584
      },
      creator: 'u2'
    }
  ]


function UpdatePlace() {
    const [isLoading, setIsLoading] = useState(true);
    //get placeId from the URL set by APP.js "/places/:placeId"
    const placeId = useParams().placeId;

    const [formState, inputHandler, setFormData] = useForm({
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        }, 
        false
    );

    const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

    //Every rerender of updateplace will run identifiedPlace again but will not run setformdata again since the identifiedPlace does not change
    useEffect(() => {
        if (identifiedPlace) {
            setFormData(
                {
                    title: {
                        value: identifiedPlace.title,
                        isValid: true
                    },
                    description: {
                        value: identifiedPlace.description,
                        isValid: true
                    }
                 },
            true
            );
        }
        setIsLoading(false);
    }, [setFormData, identifiedPlace ]);

   

    function placeUpdateSubmit(event) {
        event.preventDefault();
        console.log(formState.inputs)
    }


    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2> Could not find place!</h2>
                </Card>
            </div>
        );
    }

    if (isLoading) {
        return (
            <div className="center">
                <h2> Loading... </h2>
            </div>
        );
    }

    return (
        <form className="place-form" onSubmit={placeUpdateSubmit}>
            <Input 
                id="title" 
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="Please enter a valid title"
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input 
                id="description" 
                element="textarea"
                label="Description"
                validators={[VALIDATOR_MINLENGTH(5)]}
                errorText="Please enter a valid description (min. 5 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid}>
                UPDATE PLACE
            </Button>
        </form>
    );
}

export default UpdatePlace;