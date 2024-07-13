<template>
  <section class="info_section layout_padding2">
    <div class="container">
      <div class="row">
        <div class="col-md-6 col-lg-4 info-col">
          <div class="info_detail">
            <h4>About Us</h4>
            <p>
              Vitae aut explicabo fugit facere alias distinctio, exem commodi
              mollitia minusem dignissimos atque asperiores incidunt vel
              voluptate iste
            </p>
            <div class="info_social">
              <a href="" class="text-red">
                <font-awesome-icon
                  :icon="['fab', 'facebook']"
                  class="facebook-icon"
                />
              </a>
              <a href="">
                <font-awesome-icon
                  :icon="['fab', 'twitter']"
                  class="twitter-icon"
                />
              </a>
              <a href="">
                <font-awesome-icon
                  :icon="['fab', 'instagram']"
                  class="instagram-icon"
                />
              </a>
              <a href="">
                <font-awesome-icon
                  :icon="['fab', 'linkedin']"
                  class="linkedin-icon"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 info-col">
          <div class="info_contact">
            <h4>Address</h4>
            <div class="contact_link_box">
              <a href="">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
                <span> Location </span>
              </a>
              <a href="">
                <i class="fa fa-phone" aria-hidden="true"></i>
                <span> Call +01 1234567890 </span>
              </a>
              <a href="">
                <i class="fa fa-envelope" aria-hidden="true"></i>
                <span> demo@gmail.com </span>
              </a>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-4 info-col">
          <div class="info_contact">
            <h4>Newsletter</h4>
            <form action="#">
              <input type="text" placeholder="Enter email" />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  <footer
    class="text-center"
    style="
      background-color: white;
      color: var(--primary-color);
      font-weight: bold;
    "
  >
    <div class="p-3">&copy; 2024 No Copyright: Birdemir Soft</div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style lang="scss" scoped>
.info_section {
  background-color: var(--primary-color);
  color: #fff;
  padding: 45px 0 15px 0;

  h4 {
    font-weight: 600;
    margin-bottom: 20px;
  }

  .info-col {
    margin-bottom: 30px;
    .info_detail {
      p {
        text-align: justify;
      }
    }
  }

  .info_contact {
    .contact_link_box {
      display: flex;
      flex-direction: column;

      a {
        margin: 5px 0;
        color: #fff;

        i {
          margin-right: 5px;
        }

        &:hover {
          color: var(--primary-color);
        }
      }
    }
  }

  .info_social {
    display: flex;
    margin-top: 20px;
    margin-bottom: 10px;

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      color: var(--secondary-color);
      width: 30px;
      height: 30px;
      border-radius: 100%;
      background-color: #fff;
      border-radius: 100%;
      margin-right: 5px;
      font-size: 18px;

      &:hover {
        color: var(--secondary-color);
      }
    }
  }

  form {
    input {
      border: none;
      padding: 10px 15px;
      background-color: #f7f8f9;
      width: 100%;
      height: 45px;
      color: black;
      outline: none;
      border-radius: 45px;

      &::placeholder {
        color: #556;
      }
    }

    button {
      width: 100%;
      text-align: center;
      background-color: var(--secondary-color);
      padding: 10px;
      border: 1px solid var(--secondary-color);
      border-radius: 25px;
      color: white;
      font-weight: bold;
      margin-top: 15px;
      transition: all 0.3s ease;
      &:hover {
        background-color: var(--primary-color);
      }
    }
  }
}

// end info section
</style>
