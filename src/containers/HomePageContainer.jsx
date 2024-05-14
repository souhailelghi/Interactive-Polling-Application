
import React, { useEffect, useMemo, useState } from 'react'
import HomePage from '../components/HomePage'
function HomePageContainer({data}) {
    return (
        <HomePage surveys={data} />
    )
}
export default HomePageContainer