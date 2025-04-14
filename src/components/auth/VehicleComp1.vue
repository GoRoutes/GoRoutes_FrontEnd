  <template>
    <div class="loader">
      <div class="vanWrapper">
        <div class="vanBody">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 198 93"
            class="vansvg"
          >
            <!-- Main van body -->
            <rect
              stroke-width="3"
              stroke="#282828"
              fill="#022840"
              rx="8"
              height="65"
              width="160"
              y="25"
              x="20"
            ></rect>
            
            <!-- Front part (hood) -->
            <path
              stroke-width="3"
              stroke="#282828"
              fill="#022840"
              d="M20 50 V80 H45 V65 Q45 50 30 50 Z"
            ></path>
            
            <!-- Windows -->
            <rect
              stroke-width="2"
              stroke="#282828"
              fill="#A3D5FF"
              rx="3"
              height="25"
              width="40"
              y="35"
              x="60"
            ></rect>
            
            <rect
              stroke-width="2"
              stroke="#282828"
              fill="#A3D5FF"
              rx="3"
              height="25"
              width="40"
              y="35"
              x="110"
            ></rect>
            
            <!-- Windshield -->
            <path
              stroke-width="2"
              stroke="#282828"
              fill="#A3D5FF"
              d="M20 50 V35 H55 V50 Q45 50 30 50 Z"
            ></path>
            
            <!-- Headlight -->
            <rect
              stroke-width="2"
              stroke="#282828"
              fill="#FFFCAB"
              rx="2"
              height="8"
              width="8"
              y="55"
              x="25"
            ></rect>
            
            <!-- Back light -->
            <rect
              stroke-width="2"
              stroke="#282828"
              fill="#F83D3D"
              rx="2"
              height="8"
              width="8"
              y="55"
              x="168"
            ></rect>
            
            <!-- Door lines -->
            <line
              stroke-width="2"
              stroke="#282828"
              x1="105"
              y1="35"
              x2="105"
              y2="90"
            ></line>
            
            <!-- Door handle -->
            <rect
              stroke-width="1"
              stroke="#282828"
              fill="#DFDFDF"
              rx="1"
              height="4"
              width="10"
              y="55"
              x="113"
            ></rect>
          </svg>
        </div>
        <div class="vanTires">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            class="tiresvg"
          >
            <circle
              stroke-width="3"
              stroke="#282828"
              fill="#282828"
              r="13.5"
              cy="15"
              cx="15"
            ></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 30 30"
            class="tiresvg"
          >
            <circle
              stroke-width="3"
              stroke="#282828"
              fill="#282828"
              r="13.5"
              cy="15"
              cx="15"
            ></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
        </div>
        <div class="road"></div>

        <svg
          xml:space="preserve"
          viewBox="0 0 453.459 453.459"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          xmlns="http://www.w3.org/2000/svg"
          id="Capa_1"
          version="1.1"
          fill="#000000"
          class="lampPost"
        >
          <path
            d="M252.882,0c-37.781,0-68.686,29.953-70.245,67.358h-6.917v8.954c-26.109,2.163-45.463,10.011-45.463,19.366h9.993
    c-1.65,5.146-2.507,10.54-2.507,16.017c0,28.956,23.558,52.514,52.514,52.514c28.956,0,52.514-23.558,52.514-52.514
    c0-5.478-0.856-10.872-2.506-16.017h9.992c0-9.354-19.352-17.204-45.463-19.366v-8.954h-6.149C200.189,38.779,223.924,16,252.882,16
    c29.952,0,54.32,24.368,54.32,54.32c0,28.774-11.078,37.009-25.105,47.437c-17.444,12.968-37.216,27.667-37.216,78.884v113.914
    h-0.797c-5.068,0-9.174,4.108-9.174,9.177c0,2.844,1.293,5.383,3.321,7.066c-3.432,27.933-26.851,95.744-8.226,115.459v11.202h45.75
    v-11.202c18.625-19.715-4.794-87.527-8.227-115.459c2.029-1.683,3.322-4.223,3.322-7.066c0-5.068-4.107-9.177-9.176-9.177h-0.795
    V196.641c0-43.174,14.942-54.283,30.762-66.043c14.793-10.997,31.559-23.461,31.559-60.277C323.202,31.545,291.656,0,252.882,0z
    M232.77,111.694c0,23.442-19.071,42.514-42.514,42.514c-23.442,0-42.514-19.072-42.514-42.514c0-5.531,1.078-10.957,3.141-16.017
    h78.747C231.693,100.736,232.77,106.162,232.77,111.694z"
          ></path>
        </svg>
      </div>
    </div>
  </template>

  <script>
  export default {
    name: 'VanAnimation'
  }
  </script>

  <style scoped>
    .loader {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .vanWrapper {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
      align-items: center;
      justify-content: flex-end;
      overflow-x: hidden;
      min-height: 200px;
      margin: auto;
    }
    /* van upper body */
    .vanBody {
      width: 260px;
      height: fit-content;
      margin-bottom: 12px;
      animation: motion 1s linear infinite;
    }
    /* van suspension animation*/
    @keyframes motion {
      0% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(6px);
      }
      100% {
        transform: translateY(0px);
      }
    }
    /* van's tires */
    .vanTires {
      width: 160px;
      height: fit-content;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0px 10px 0px 15px;
      position: absolute;
      bottom: 0;
    }
    .vanTires svg {
      width: 48px;
    }

    .road {
      width: 100%;
      height: 3px;
      background-color: #282828;
      position: relative;
      bottom: 0;
      align-self: flex-end;
      border-radius: 6px;
    }
    .road::before {
      content: "";
      position: absolute;
      width: 40px;
      height: 100%;
      background-color: #282828;
      right: -50%;
      border-radius: 6px;
      animation: roadAnimation 1.4s linear infinite;
      border-left: 20px solid white;
    }
    .road::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 100%;
      background-color: #282828;
      right: -65%;
      border-radius: 6px;
      animation: roadAnimation 1.4s linear infinite;
      border-left: 8px solid white;
    }

    .lampPost {
      position: absolute;
      bottom: 0;
      right: -90%;
      height: 180px;
      animation: roadAnimation 1.4s linear infinite;
    }

    @keyframes roadAnimation {
      0% {
        transform: translateX(0px);
      }
      100% {
        transform: translateX(-700px);
      }
    }
  </style>