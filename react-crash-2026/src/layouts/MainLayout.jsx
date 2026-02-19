
import HomeCards from '../components/Homecards'
import JobListings from '../components/JobListings'
import ViewAllJobs from '../components/ViewAllJobs'
import Hero from '../components/Hero'

import React from 'react'

const MainLayout = () => {
  return (
    <>
    <Hero />
    <HomeCards />
    <JobListings />
    <ViewAllJobs />
    </>
  )
}

export default MainLayout;
