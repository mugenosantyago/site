import Sidebar from '@/components/Sidebar';

export default function ContactPage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />
        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">Contact&nbsp;</h1>
          </div>

          <div className="row my-4">
            {/* Original structure had col-lg-7 and then col-lg-5 inside it? Correcting nesting. */}
            <div className="col-lg-12 col-12">
              <div className="custom-block bg-white">
                <h6 className="mb-4">&nbsp;mgmt@santyago.io</h6>
                <p>
                  <strong>&nbsp;</strong>
                  {/* Phone number link - consider if still desired */}
                  <a href="tel: 305-240-9671" className="ms-2">
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;for all inquiries
                  </a>
                </p>
              </div>
            </div>
             {/* Original had a copyright block here, often better in a shared footer */}
             {/* <div className="col-lg-5 col-12">
                <div className="custom-block custom-block-contact">
                   <h6 className="mb-4">(C) ROSE MUSIC CLUB 2023&nbsp;</h6>
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