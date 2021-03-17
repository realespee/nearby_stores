import React from 'react'
import './sidebar.css'
// import { FixedSizeList as List } from 'react-window';
import {
    List, 
    AutoSizer, 
    CellMeasurer, 
    CellMeasurerCache
} from 'react-virtualized'

const Sidebar = ({data}) => {


    const cache = React.useRef(new CellMeasurerCache({
        fixedHeight:true,
        defaultHeight: 110,
    }))

    return(
        <div className='sidebar'>
            
            <h3 className='item-title'><strong>Top 20 Stores Nearby</strong></h3>
            <div className='wrapper' style={{width: "100%", height: "100vh"}}>
            <AutoSizer>
                {({width, height})=>
                    (
                        <List
                            width={width}
                            height={height}
                            rowHeight={cache.current.rowHeight}
                            deferredMeasurementCache={cache.current}
                            rowCount={data.length}
                            rowRenderer={({key, index, style, parent})=>{
                                const store = data[index]

                                return (
                                    <CellMeasurer 
                                        key={key} 
                                        cache={cache.current} 
                                        parent={parent}
                                        columnIndex={0}
                                        rowIndex={index}
                                        >
                                        <div className='single-store' style={style}>
                                            <p><strong>{store.name}</strong></p>
                                            <p>{store.vicinity}</p>
                                        </div>
                                    </CellMeasurer>
                                );
                            }}
                        /> 
                    )
                }
           
            </AutoSizer>
            </div>    
        </div>
    )
}

export default Sidebar