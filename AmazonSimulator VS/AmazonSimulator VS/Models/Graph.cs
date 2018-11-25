﻿using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;

namespace Models
{
    public class Graph
    {
        private List<Point> _points = new List<Point>();
        public List<Point> points { get { return _points; } }

        /// <summary>
        /// Constructor for the graph/list with all the points
        /// </summary>
        /// <param name="points"></param>
        public Graph(List<Point> points)
        {
            _points = points;
        }
    }
}