import Sidebar from '@/components/Sidebar';
// import Link from 'next/link'; // Import Link for external links too (optional, standard <a> is fine) Removed

export default function ShopPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">shop</h1>
          </div>

          <div className="row my-4">
            <div className="col-lg-7 col-12">
              <div className="custom-block bg-white">
                {/* Use standard <a> for external link */}
                <a 
                  className="nav-link" // Keep class if styled
                  href="https://fauxofficial.gumroad.com/"
                  target="_blank" // Open external links in new tab
                  rel="noopener noreferrer" // Security best practice
                >
                  Click here to check out my gumroad
                </a>
              </div>
            </div>
            {/* Original had copyright block here as well */}
            {/* <div className="col-lg-5 col-12">
              <div className="custom-block custom-block-contact">
                <h6 className="mb-4">&nbsp;(C) ROSE MUSIC CLUB 2023</h6>
                <p><strong>&nbsp;</strong><a href="tel: 305-240-9671" className="ms-2"> &nbsp; </a></p>
              </div>
            </div> */}
          </div>
           {/* Footer potentially here */}
        </main>
      </div>
    </div>
  );
} 