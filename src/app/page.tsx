import Image from "next/image";
import Sidebar from '@/components/Sidebar';

export default function HomePage() {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <main className="main-wrapper col-md-9 ms-sm-auto py-4 col-lg-9 px-md-4 border-start">
          <div className="title-group mb-3">
            <h1 className="h2 mb-0">SANTYAGO OF THE DREAMS&nbsp; &nbsp;&nbsp;</h1>
            <small className="text-muted">夢幻のサンチャゴ&nbsp;</small>
          </div>

          <div className="row my-4">
            <div className="col-lg-7 col-12">
              <div className="custom-block custom-block-transations">
                <p>EPK&nbsp;</p>
                <p>&nbsp;</p>
                <iframe
                  width="570"
                  height="320"
                  src="https://www.youtube.com/embed/DcIUpadsjCc?si=VvKqseAloI0fvnsv"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p>&nbsp;</p>
                <p><small>SATURN&apos;S REVENGE</small></p>
                <p><small>&nbsp; &nbsp;</small></p>
                <div className="custom-block-numbers d-flex align-items-center">
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube.com/embed/0a9AE5O2vNI?si=0NSxmeH4Cb5qz47C"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <span>&nbsp;</span>
                  <span>&nbsp;</span>
                  <p>&nbsp;</p>
                </div>
                <div className="d-flex">
                  <div>
                    <small>&nbsp;</small>
                    <p>&nbsp;</p>
                  </div>
                  <div className="ms-auto"></div>
                </div>
              </div>

              <div className="custom-block bg-white">
                <h5 className="mb-4">
                  [santyago &lt;bass&gt;&nbsp; &nbsp;b2b frzntrtl]&nbsp;
                </h5>
                <iframe
                  width="430"
                  height="370"
                  src="https://www.youtube.com/embed/dbbL9Jcy76Q?si=STPJiMCnIfP53hii"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="custom-block bg-white">
                 <iframe
                  width="430"
                  height="315"
                  src="https://www.youtube.com/embed/79K7hcvRA98?si=aPRjDlfnRFePcy0z"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="mb-3"
                ></iframe>
                <iframe
                  width="430"
                  height="315"
                  src="https://www.youtube.com/embed/Vwg7o0NU0F8?si=k0r_Jyo96W9D61LL"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
            </div>

            <div className="col-lg-5 col-12">
              <div className="custom-block custom-block-profile-front custom-block-profile text-center bg-white">
                <div className="custom-block-profile-image-wrap mb-4">
                  <Image
                    src="/images/profile-new.jpg"
                    className="custom-block-profile-image img-fluid"
                    alt="Santyago Profile Picture"
                    width={150}
                    height={150}
                    priority
                  />
                </div>
                <p className="d-flex flex-wrap mb-2">
                  <strong style={{ textAlign: 'left' }}>
                    Tomás Santyago Cañizares, known for versatile production
                    spanning from french house to hip-hop and experimental
                    rhythm and blues, is a partially colorblind Ecuadorian
                    immigrant who has been continuously releasing music since
                    2013, participating in the underground and emerging
                    SoundCloud scene. He eventually released two albums,
                    including his heavily bass-influenced self-titled album, and
                    a multitude of singles. Santyago has worked in the industry
                    as an audio engineer in Chicago, Denver and Los Angeles and
                    has been active in helping live events throughout California
                    as well as collaborating with many artists for different
                    audio and visual projects. He will return&nbsp; at the end
                    of the year with his junior album &quot;Saturn&apos;s
                    Revenge&quot;.
                  </strong>
                  <span>&nbsp;</span>
                </p>
                <p className="d-flex flex-wrap mb-2">
                  <strong>&nbsp;</strong>
                  <a href="#"> &nbsp;</a>
                </p>
                <p className="d-flex flex-wrap mb-0">
                  <strong>&nbsp;</strong>
                  <a href="#"> &nbsp; </a>
                </p>
              </div>

              <div className="custom-block custom-block-bottom d-flex flex-wrap">
                <div className="custom-block-bottom-item">
                  <a href="#" className="d-flex flex-column"> </a>
                </div>
                <div className="custom-block-bottom-item">
                  <a href="#" className="d-flex flex-column"> </a>
                </div>
                <div className="custom-block-bottom-item">
                  <a href="#" className="d-flex flex-column"> </a>
                </div>
                <div className="custom-block-bottom-item">
                  <a href="#" className="d-flex flex-column"> </a>
                </div>
              </div>

              <div className="custom-block custom-block-transations">
                <h5 className="mb-4">&nbsp;CHANGES</h5>
                <div className="d-flex flex-wrap align-items-center mb-4">
                  <div className="d-flex align-items-center">
                    <div>
                      <p>
                        <a href="#"> {/* Placeholder link */} &nbsp;</a>&nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;FEATURING SODAPOPBRI
                      </p>
                      <small className="text-muted">&nbsp;</small>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <iframe
                      style={{ borderRadius: '12px' }}
                      src="https://open.spotify.com/embed/track/0XSezKLlr2aKShIiJGsumq?utm_source=generator"
                      width="100%"
                      height="352"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                    <strong className="d-block text-danger"><span className="me-1">&nbsp;</span></strong>
                  </div>
                </div>
                <div className="d-flex flex-wrap align-items-center mb-4">
                   <div className="d-flex align-items-center">
                     <div>
                      <p><a href="#">&nbsp;</a></p> {/* Placeholder link */}
                      <small className="text-muted">&nbsp;</small>
                    </div>
                  </div>
                  <div className="ms-auto">
                    <small>&nbsp;</small>
                    <strong className="d-block text-success"><span className="me-1">&nbsp;</span></strong>
                  </div>
                </div>
                 <div className="d-flex flex-wrap align-items-center">
                  <div className="d-flex align-items-center"></div>
                </div>
              </div>

               <div className="custom-block primary-bg">
                  <h5 className="text-white mb-4">&nbsp;[777]</h5>
                   <iframe
                    width="400"
                    height="315"
                    src="https://www.youtube.com/embed/jQxbx-IBkyI?si=0MkDuf78eG8dS-ap"
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                  <a href="#"> </a>
                  <a href="#"> </a>
                </div>

            </div>
          </div>

          <footer className="site-footer">
            <div className="container">
              <div className="row"></div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
