using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class LightHouse : Model3D, IUpdatable
    {
        private List<Barrels> _barrels;
        public List<Barrels> barrels { get { return _barrels; } }
        private List<BoatTask> tasks = new List<BoatTask>();
        private bool _loadable;

        public bool loadable { get { return _loadable; } }

        /// <summary>
        /// Constructor for the Lighthouse 
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="rotationX"></param>
        /// <param name="rotationY"></param>
        /// <param name="rotationZ"></param>
        public LightHouse(decimal x, decimal y, decimal z, decimal rotationX, decimal rotationY, decimal rotationZ)
        {
            this.type = "lighthouse";
            this.guid = Guid.NewGuid();

            this._x = x;
            this._y = y;
            this._z = z;

            this._rX = rotationX;
            this._rY = rotationY;
            this._rZ = rotationZ;

            this._barrels = new List<Barrels>();
            this._loadable = false;
        }

        /// <summary>
        /// Constructor for the Lighthouse to add it to a point
        /// </summary>
        /// <param name="point"></param>
        public LightHouse(Point point)
        {
            this.type = "lighthouse";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;

            this._barrels = new List<Barrels>();
            this._loadable = false;
        }
    }
}