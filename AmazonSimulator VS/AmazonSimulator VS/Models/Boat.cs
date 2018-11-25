using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Boat : Model3D, IUpdatable
    {
        private List<Barrels> _barrels;
        public List<Barrels> barrels { get { return _barrels; } }
        private List<BoatTask> tasks = new List<BoatTask>();
        private bool _loadable;
        public bool loadable { get { return _loadable; } }

        /// <summary>
        /// Constructor for creating the Boat with a position
        /// </summary>
        /// <param name="x"></param>
        /// <param name="y"></param>
        /// <param name="z"></param>
        /// <param name="rotationX"></param>
        /// <param name="rotationY"></param>
        /// <param name="rotationZ"></param>
        public Boat(decimal x, decimal y, decimal z, decimal rotationX, decimal rotationY, decimal rotationZ)
        {
            this.type = "boat";
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
        /// Constructor for creating the Boat with a point
        /// </summary>
        /// <param name="point"></param>
        public Boat(Point point)
        {
            this.type = "boat";
            this.guid = Guid.NewGuid();

            this._x = point.x;
            this._y = point.y;
            this._z = point.z;

            this._barrels = new List<Barrels>();
            this._loadable = false;
        }

        /// <summary>
        /// Method to add barrel to list and move them to the specified point
        /// </summary>
        /// <param name="barrel"></param>
        public void AddBarrel(Barrels barrel)
        {
            _barrels.Add(barrel);
            barrel.AssignPoint(null);
            barrel.Move(this.x, this.y + 0.2m, this.z);
        }

        /// <summary>
        /// Method to remove barrel to list and move them to the specified point
        /// </summary>
        /// <param name="r"></param>
        public void RemoveBarrels(Robot r)
        {
            if (_barrels.Last() != null && r.barrel == null)
            {
                r.AssignBarrel(barrels.Last());
                _barrels.Remove(_barrels.Last());
            }
        }

        /// <summary>
        /// Method to remove barrel to list and move them to the specified point
        /// </summary>
        /// <param name="point"></param>
        public void RemoveBarrel(Point point)
        {
            if (_barrels.Last() != null && point.barrel == null)
            {
                point.AddBarrel(_barrels.Last());
                _barrels.Remove(_barrels.Last());
            }
        }

        /// <summary>
        /// Method to check if the Boat is loadable and can leave
        /// </summary>
        public void SwitchLoadable()
        {
            if (loadable == false)
            {
                this._loadable = true;
            }
            else
            {
                this._loadable = true;
            }
        }

        /// <summary>
        /// Method for movement of the object
        /// </summary>
        /// <param name="point"></param>
        public void Move(Point point)
        {
            if (this.x < point.x)
            {
                this.Move(this.x + 0.8m, this.y, this.z);
            }
            else if (this.x > point.x)
            {
                this.Move(this.x - 0.5m, this.y, this.z);
            }

            if (this.z < point.z)
            {
                this.Move(this.x, this.y, this.z + 0.5m);
            }
            else if (this.z > point.z)
            {
                this.Move(this.x, this.y, this.z - 0.5m);
            }

            if (_barrels != null)
            {
                foreach (Barrels barrel in _barrels)
                {
                    barrel.Move(this.x, this.y + 0.4m, this.z);
                }
            }
        }

        /// <summary>
        /// Method to add tasks to the object
        /// </summary>
        /// <param name="task"></param>
        public void AddTask(BoatTask task)
        {
            tasks.Add(task);
        }

        /// <summary>
        /// Update method, used to make the application tick 50 times every second
        /// </summary>
        /// <param name="tick"></param>
        /// <returns></returns>
        public override bool Update(int tick)
        {
            if (tasks != null && tasks.Any())
            {
                if (tasks.First().TaskComplete(this))
                {
                    tasks.RemoveAt(0);

                    if (tasks.Count == 0)
                    {
                        tasks = null;
                    }
                }
                if (tasks != null)
                {
                    tasks.First().StartTask(this);
                }
            }
            return base.Update(tick);
        }
    }
}