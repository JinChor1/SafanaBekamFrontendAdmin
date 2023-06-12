import { bodyAnt,bodyPost } from "./bodySVG"

const BodyMap = ({selectedPart,setSelectedPart,hasContent}) => {
    return(
        <div className="bodymap">
            {/* anterior  */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97" className="bodymap-anterior">
                <g>
                    {bodyAnt.map((bodypart, index) => 
                        <path
                            className={ selectedPart===bodypart.id ?
                                "bodymap-selected bodymap-part" : hasContent.includes(bodypart.id)?
                                "bodymap-hasContent bodymap-part" : "bodymap-part"
                            }
                            id={bodypart.id}
                            d={bodypart.d}
                            fill={"#b3b3b3"}
                            onClick={()=>setSelectedPart(bodypart.id)}
                        />
                    )}
                </g>
            </svg>
            {/* posterior */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375.42 832.97" className="bodymap-posterior">
                <g>
                    {bodyPost.map((bodypart, index) => 
                        <path
                            className={ selectedPart===bodypart.id ?
                                "bodymap-selected bodymap-part" : hasContent.includes(bodypart.id)?
                                "bodymap-hasContent bodymap-part" : "bodymap-part"
                            }
                            id={bodypart.id}
                            d={bodypart.d}
                            fill={"#b3b3b3"}
                            onClick={()=>setSelectedPart(bodypart.id)}
                        />
                    )}
                </g>
            </svg>
        </div>
    )
}

export default BodyMap