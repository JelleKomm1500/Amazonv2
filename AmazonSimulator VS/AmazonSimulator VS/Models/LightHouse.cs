using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class LightHouse : Model3D, IUpdatable
    {
        private List<Barrels> _chests;
        public List<Barrels> chests { get { return _chests; } }
        private List<BoatTask> tasks = new List<BoatTask>();
        private bool _loadable;

        public bool loadable { get { return _loadable; } }

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

            this._chests = new List<Barrels>();
            this._loadable = false;
        }

        public LightHouse(Point point)
        {
            this.type = "lighthouse";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;

            this._chests = new List<Barrels>();
            this._loadable = false;
        }
    }
}